package com.ucig.fuelpass.Requests;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class CreateOrderRequest {

    @JsonProperty String icao;
    @JsonProperty String tailNumber;
    @JsonProperty Long startDate;
    @JsonProperty Long endDate;
    @JsonProperty Double requestedVolume;

    public String getIcao() {
        return icao;
    }

    public void setIcao(String icao) {
        this.icao = icao;
    }

    public String getTailNumber() {
        return tailNumber;
    }

    public void setTailNumber(String tailNumber) {
        this.tailNumber = tailNumber;
    }

    public Long getStartDate() {
        return startDate;
    }

    public void setStartDate(Long startDate) {
        this.startDate = startDate;
    }

    public Long getEndDate() {
        return endDate;
    }

    public void setEndDate(Long endDate) {
        this.endDate = endDate;
    }

    public Double getRequestedVolume() {
        return requestedVolume;
    }

    public void setRequestedVolume(Double requestedVolume) {
        this.requestedVolume = requestedVolume;
    }
}
