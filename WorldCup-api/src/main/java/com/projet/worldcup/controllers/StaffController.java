package com.projet.worldcup.controllers;

import com.projet.worldcup.Dto.StaffDto;
import com.projet.worldcup.services.StaffService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/staffs")
@RequiredArgsConstructor
public class StaffController {

    private final StaffService staffService;

    @GetMapping
    public List<StaffDto> getAllStaffs() {
        return staffService.getAllStaffs();
    }

    @PostMapping
    public void createStaff(@RequestBody StaffDto staffDto) {
        staffService.createStaff(staffDto);
    }

    @PutMapping
    public void updateStaff(@RequestBody StaffDto staffDto) {
        staffService.updateStaff(staffDto);
    }

    @DeleteMapping("/{id}")
    public void deleteStaffById(@PathVariable Long id) {
        staffService.deleteStaffById(id);
    }

    @GetMapping("/{id}")
    public StaffDto getStaffById(@PathVariable Long id) {
        return staffService.getStaffById(id);
    }
}