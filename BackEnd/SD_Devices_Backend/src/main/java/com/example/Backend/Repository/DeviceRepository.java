package com.example.Backend.Repository;

import com.example.Backend.Model.Device;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface DeviceRepository extends CrudRepository<Device,Integer> {
    List<Device> findByUserId(Integer userId);
}
