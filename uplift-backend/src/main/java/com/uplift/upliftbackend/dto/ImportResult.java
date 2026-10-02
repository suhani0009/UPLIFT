package com.uplift.upliftbackend.dto;

public class ImportResult {

    private int totalRows;
    private int imported;
    private int duplicates;
    private int invalid;

    public ImportResult() {
    }

    public ImportResult(int totalRows, int imported, int duplicates, int invalid) {
        this.totalRows = totalRows;
        this.imported = imported;
        this.duplicates = duplicates;
        this.invalid = invalid;

    }

    public int getTotalRows() {
        return totalRows;
    }

    public void setTotalRows(int totalRows) {
        this.totalRows = totalRows;
    }

    public int getImported() {
        return imported;
    }

    public void setImported(int imported) {
        this.imported = imported;
    }

    public int getDuplicates() {
        return duplicates;
    }

    public void setDuplicates(int duplicates) {
        this.duplicates = duplicates;
    }

    public int getInvalid() {
        return invalid;
    }

    public void setInvalid(int invalid) {
        this.invalid = invalid;
    }
}
