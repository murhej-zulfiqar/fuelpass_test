package com.ucig.fuelpass.Requests;

import com.fasterxml.jackson.annotation.JsonProperty;

public class OrderStatusRequest {

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @JsonProperty String status;
}
