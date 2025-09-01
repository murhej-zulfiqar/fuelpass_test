package com.ucig.fuelpass.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ucig.fuelpass.Enums.FieldType;
import com.ucig.fuelpass.annotations.FormField;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.java.Log;

import java.util.UUID;

@Entity
@Data
@Table(name = "orders")
@NoArgsConstructor
public class Order implements DataModel{
    @Id
    @GeneratedValue(generator = "uuid1")
    private UUID id;

    @FormField(label = "Airport ICAO", required = true, order = 1, name = "icao", validations = {"length:4"})
    private String icao;
    @FormField(label = "Tail Number", required = true, order = 2, name = "tailNumber")
    private String TailNumber;
    @FormField(label = "Requested Volume", type = FieldType.NUMBER, required = true, order = 3, name="requestedVolume", validations = {"minValue:0"})
    private Double requestedVolume;
    private String status;
    @FormField(label = "Requested From", type = FieldType.DATE, required = true, order = 4, name="startDate")
    private Long startDate;

    private Long createdAt;
    private Long updatedAt;
    @FormField(label = "Expires At", type = FieldType.DATE, required = true, order = 5,name="endDate")
    private Long endDate;

    @ManyToOne
    @JoinColumn(name = "created_by", nullable = false)
    private User user;
    // todo add created by  field


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