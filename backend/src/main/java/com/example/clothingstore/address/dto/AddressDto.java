package com.example.clothingstore.address.dto;

import lombok.Builder;
import lombok.Data;
@Data
@Builder
public class AddressDto {
    private Long id;
    private String receiverName;
    private String phone;
    private String streetAddress;
    private String ward;
    private String district;
    private String city;
    private Boolean isDefault;

    public AddressDto() {
    }

    public AddressDto(Long id, String receiverName, String phone, String streetAddress, String ward, String district, String city, Boolean isDefault) {
        this.id = id;
        this.receiverName = receiverName;
        this.phone = phone;
        this.streetAddress = streetAddress;
        this.ward = ward;
        this.district = district;
        this.city = city;
        this.isDefault = isDefault;
    }
}
