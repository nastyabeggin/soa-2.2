package ru.itmo.soa.mainservice.model.dto;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;
import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;
import lombok.Data;
import ru.itmo.soa.mainservice.model.Band;

import java.util.List;

@Data
@JacksonXmlRootElement(localName = "MusicBands")
public class BandsInfoResponse {
        @XmlElement
        private List<Band> data;
        @XmlElement
        private int total;
        @XmlElement
        private int totalPages;
        @XmlElement
        private int currentPage;
        @XmlElement
        private int size;
}

