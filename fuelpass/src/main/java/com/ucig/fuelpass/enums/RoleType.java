package com.ucig.fuelpass.enums;

/**
 * The names of the roles
 */
public enum RoleType {

    AIRCRAFT_OPERATOR("Aircraft Operator"),
    OPERATIONS_MANAGER("Operations Manager");

    private final String label;

    RoleType(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}

