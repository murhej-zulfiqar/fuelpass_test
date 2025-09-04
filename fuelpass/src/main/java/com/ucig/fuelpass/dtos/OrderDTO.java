package com.ucig.fuelpass.dtos;

import com.ucig.fuelpass.models.User;

import java.util.UUID;

public class OrderDTO extends BaseDTO{

    UUID id;

     String icao;
     String TailNumber;
     Double requestedVolume;
     String status;
     Long startDate;

     Long createdAt;
     Long updatedAt;
     Long endDate;

     User user;

    public OrderDTO(UUID id, String icao, String tailNumber, Double requestedVolume, String status, Long startDate, Long createdAt, Long updatedAt, Long endDate, User user) {
        this.id = id;
        this.icao = icao;
        TailNumber = tailNumber;
        this.requestedVolume = requestedVolume;
        this.status = status;
        this.startDate = startDate;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.endDate = endDate;
        this.user = user;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getIcao() {
        return icao;
    }

    public void setIcao(String icao) {
        this.icao = icao;
    }

    public String getTailNumber() {
        return TailNumber;
    }

    public void setTailNumber(String tailNumber) {
        TailNumber = tailNumber;
    }

    public Double getRequestedVolume() {
        return requestedVolume;
    }

    public void setRequestedVolume(Double requestedVolume) {
        this.requestedVolume = requestedVolume;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getStartDate() {
        return startDate;
    }

    public void setStartDate(Long startDate) {
        this.startDate = startDate;
    }

    public Long getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Long createdAt) {
        this.createdAt = createdAt;
    }

    public Long getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Long updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Long getEndDate() {
        return endDate;
    }

    public void setEndDate(Long endDate) {
        this.endDate = endDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
