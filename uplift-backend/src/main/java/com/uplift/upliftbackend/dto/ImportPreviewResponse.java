package com.uplift.upliftbackend.dto;

import java.util.List;

public class ImportPreviewResponse {

    private String fileName;
    private List<String> columns;

    public ImportPreviewResponse() {
    }

    public ImportPreviewResponse(String fileName, List<String> columns) {
        this.fileName = fileName;
        this.columns = columns;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public List<String> getColumns() {
        return columns;
    }

    public void setColumns(List<String> columns) {
        this.columns = columns;
    }
}
