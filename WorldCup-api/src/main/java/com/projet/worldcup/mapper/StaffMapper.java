package com.projet.worldcup.mapper;
import com.projet.worldcup.Dto.StaffDto;
import com.projet.worldcup.models.Staff;
import org.mapstruct.Mapper;

@Mapper(uses = {TeamMapper.class})
public interface StaffMapper {

    StaffDto staffToStaffDto(Staff staff);
    Staff staffDtoToStaff(StaffDto staffDto);

}