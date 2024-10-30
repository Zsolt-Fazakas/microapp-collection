package com.example.Backend.Model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

@Entity
@Data
@ToString
public class Device {
    @Id
    @Column(name = "device_id")
    private Integer deviceId;
    @Column(name = "user_id")
    private Integer userId;
    private String description;
    private String address;
    private Double mhec;
    private String status;
}
