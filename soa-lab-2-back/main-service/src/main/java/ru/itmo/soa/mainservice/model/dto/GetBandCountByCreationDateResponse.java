package ru.itmo.soa.mainservice.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetBandCountByCreationDateResponse {
    private Long count;
    private Date creationDate;
}
