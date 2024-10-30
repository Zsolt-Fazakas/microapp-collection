package com.example.Backend.Service;

import com.example.Backend.Model.Device;
import com.example.Backend.Repository.DeviceRepository;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class DeviceService {
    @Autowired
    public DeviceRepository deviceRepository;
    public Iterable<Device> getAll(){ return deviceRepository.findAll();}
    public List<Device> getDevicesByUserId(Integer userId){
        return deviceRepository.findByUserId(userId);
    }
    public Device createDevice(Device device){ return deviceRepository.save(device);}
    public void deleteDevice(Integer id) {
        if (!deviceRepository.existsById(id)) {
            throw new ResourceNotFoundException("Device not found with id: " + id);
        }
        deviceRepository.deleteById(id);
    }
    public Device updateDevice(Integer id, Device deviceDetails) {
        Device device = deviceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Device not found with id: " + id));

        device.setUserId(deviceDetails.getUserId());
        device.setDescription(deviceDetails.getDescription());
        device.setAddress(deviceDetails.getAddress());
        device.setMhec(deviceDetails.getMhec());
        device.setStatus(deviceDetails.getStatus());

        return deviceRepository.save(device);
    }
}
