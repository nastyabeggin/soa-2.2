package ru.itmo.soa.mainservice.repositories;

import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import ru.itmo.soa.mainservice.model.Band;
import ru.itmo.soa.mainservice.exceptions.InvalidParameterException;

public class BandSpecifications {
    public static Specification<Band> createSpecification(String[] filters) {
        return (root, query, criteriaBuilder) -> {
            Predicate predicate = criteriaBuilder.conjunction(); // Стартуем без условий

            if (filters != null) {
                for (String filter : filters) {
                    if (!filter.contains("[")) {
                        throw new InvalidParameterException("Invalid filter format: " + filter);
                    }

                    String[] paramParts = filter.split("\\[");
                    if (paramParts.length != 2) {
                        throw new InvalidParameterException("Invalid filter parameter format: " + filter);
                    }

                    String field = paramParts[0].trim();
                    String operatorAndValue = paramParts[1].trim();

                    String operator;
                    String value;

                    if (operatorAndValue.contains("]")) {
                        int operatorEndIndex = operatorAndValue.indexOf("]");
                        operator = operatorAndValue.substring(0, operatorEndIndex);
                        value = operatorAndValue.substring(operatorEndIndex + 1).trim(); // Получаем значение после закрывающей скобки
                    } else {
                        throw new InvalidParameterException("Invalid filter format: " + filter);
                    }

                    Predicate condition = switch (operator.toLowerCase()) {
                        case "eq" -> criteriaBuilder.equal(root.get(field), value);
                        case "neq" -> criteriaBuilder.notEqual(root.get(field), value);
                        case "gt" -> criteriaBuilder.greaterThan(root.get(field), value);
                        case "gte" -> criteriaBuilder.greaterThanOrEqualTo(root.get(field), value);
                        case "lt" -> criteriaBuilder.lessThan(root.get(field), value);
                        case "lte" -> criteriaBuilder.lessThanOrEqualTo(root.get(field), value);
                        case "~" -> criteriaBuilder.like(root.get(field), "%" + value + "%");
                        default -> throw new InvalidParameterException("Unknown operator: " + operator);
                    };
                    predicate = criteriaBuilder.and(predicate, condition);
                }
            }

            return predicate;
        };
    }
}
