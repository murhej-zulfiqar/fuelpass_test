package com.ucig.fuelpass.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "users")
public class User implements UserDetails, DataModel {
    @Id
    @GeneratedValue(generator = "uuid1")
    private UUID id;
    @JsonIgnore
    private String password;
    private String username;
    private Long created_at;
    private Long updated_at;
    private Long last_login_at;
    @OneToOne
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    public User(String password, String username, Long created_at, Role role) {
        this.password = password;
        this.username = username;
        this.created_at = created_at;
        this.role = role;
    }

    public User(){

    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Long getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Long created_at) {
        this.created_at = created_at;
    }

    public Long getUpdated_at() {
        return updated_at;
    }

    public void setUpdated_at(Long updated_at) {
        this.updated_at = updated_at;
    }

    public Long getLast_login_at() {
        return last_login_at;
    }

    public void setLast_login_at(Long last_login_at) {
        this.last_login_at = last_login_at;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }


}