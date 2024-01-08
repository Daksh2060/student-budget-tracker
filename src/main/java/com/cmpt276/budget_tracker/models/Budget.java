package com.cmpt276.budget_tracker.models;

//import javax.persistence.*;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Budget {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    private String category;
    private double amount;

    public Budget() {}

    public Budget(Users user, String category, double amount) {
        this.user = user;
        this.category = category;
        this.amount = amount;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public Users getUser() {
        return user;
    }

    public String getCategory() {
        return category;
    }

    public double getAmount() {
        return amount;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }
}

