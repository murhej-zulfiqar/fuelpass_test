package com.ucig.fuelpass.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Data
@Table(name = "roles")
@NoArgsConstructor
public class Role implements DataModel{
    @Id
    @GeneratedValue(generator = "uuid1")
    private UUID id;

    private String Name;
    @Column(name="canonical_name", unique = true)
    private String canonicalName;
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getCanonicalName() {
        return canonicalName;
    }

    public void setCanonicalName(String canonicalName) {
        this.canonicalName = canonicalName;
    }



}