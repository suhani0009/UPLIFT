package com.uplift.upliftbackend.dto;

public class ColumnMapping {

    private String sourceColumn;
    private String targetField;

    public ColumnMapping() {
    }

    public String getSourceColumn() {
        return sourceColumn;
    }

    public void setSourceColumn(String sourceColumn) {
        this.sourceColumn = sourceColumn;
    }

    public String getTargetField() {
        return targetField;
    }

    public void setTargetField(String targetField) {
        this.targetField = targetField;
    }
}