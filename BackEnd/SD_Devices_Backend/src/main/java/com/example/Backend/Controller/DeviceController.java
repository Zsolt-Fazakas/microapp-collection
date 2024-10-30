package com.example.Backend.Controller;

import com.example.Backend.Model.Device;
import com.example.Backend.Service.DeviceService;
import lombok.Data;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin
@Data
public class DeviceController {

    @Autowired
    private DeviceService deviceService;
    @GetMapping("/GetAllDevices")
    public Iterable<Device> getAll(){return deviceService.getAll();}
    @GetMapping("/GetDevice/{userId}")
    public ResponseEntity<List<Device>> getDevicesByUserId(@PathVariable Integer userId) {
        List<Device> devices = deviceService.getDevicesByUserId(userId);
        if (devices.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(devices);
    }
    @DeleteMapping("/DeleteDevice/{id}")
    public ResponseEntity<Void> deleteDevice(@PathVariable Integer id) {
        try {
            deviceService.deleteDevice(id);
            return ResponseEntity.noContent().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/UpdateDevice/{id}")
    public ResponseEntity<Device> updateDevice(@PathVariable Integer id, @RequestBody Device deviceDetails) {
        try {
            Device updatedDevice = deviceService.updateDevice(id, deviceDetails);
            return ResponseEntity.ok(updatedDevice);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/CreateDevice")
    public ResponseEntity<Device> createDevice(@RequestBody Device device) {
        try {
            Device createdDevice = deviceService.createDevice(device);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdDevice);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
