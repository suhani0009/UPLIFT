package com.uplift.upliftbackend.dto;

import java.util.List;

public class ColumnMappingRequest {

    private List<ColumnMapping> mappings;

    public ColumnMappingRequest() {
    }

    public List<ColumnMapping> getMappings() {
        return mappings;
    }

    public void setMappings(List<ColumnMapping> mappings) {
        this.mappings = mappings;
    }
}