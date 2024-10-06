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
                    // Проверяем формат фильтра
                    if (!filter.contains("=")) {
                        throw new InvalidParameterException("Invalid filter format: " + filter);
                    }

                    String[] parts = filter.split("=");
                    if (parts.length != 2) {
                        throw new InvalidParameterException("Invalid filter format: " + filter);
                    }

                    String[] paramParts = parts[0].split("\\[");
                    if (paramParts.length != 2) {
                        throw new InvalidParameterException("Invalid filter parameter format: " + filter);
                    }

                    String field = paramParts[0].trim();
                    String operator = paramParts[1].replace("]", "").trim();
                    String value = parts[1].trim();

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
