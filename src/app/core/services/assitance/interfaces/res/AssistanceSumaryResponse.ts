import MetadataPage from "@shared/interfaces/Metadata.constant";

export interface AssistanceSummaryResponse {
  data: AssistanceSummary[];
  metadata?: MetadataPage; // Representa el campo opcional `Meta`.
}

export interface AssistanceSummary {
  date: string; // Corresponde al campo `Date`.
  total: number;
}
