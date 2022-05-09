package com.projet.worldcup.services.impl;

import com.projet.worldcup.Dto.StaffDto;
import com.projet.worldcup.mapper.StaffMapper;
import com.projet.worldcup.repository.StaffRepository;
import com.projet.worldcup.services.StaffService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StaffServiceImpl implements StaffService {

    private final StaffRepository staffRepository;
    private final StaffMapper staffMapper;

    @Override
    public void createStaff(StaffDto staffDto) {
        staffRepository.save(staffMapper.staffDtoToStaff(staffDto));
    }

    @Override
    public void updateStaff(StaffDto staffDto) {
        staffRepository.save(staffMapper.staffDtoToStaff(staffDto));
    }

    @Override
    public void deleteStaffById(Long id) {
        staffRepository.deleteById(id);
    }

    @Override
    public StaffDto getStaffById(Long id) {
        return staffMapper.staffToStaffDto(staffRepository.findById(id).orElseThrow(RuntimeException::new));
    }

    @Override
    public List<StaffDto> getAllStaffs() {
        return staffRepository.findAll()
                .stream()
                .map(staffMapper::staffToStaffDto)
                .collect(Collectors.toList());
    }
}