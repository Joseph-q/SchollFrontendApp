import MetadataPage from "@shared/interfaces/Metadata.constant";

export interface AssistanceSummaryResponse {
  data: AssistanceSummary[];
}

export interface AssistanceSummary {
  date: string; // Corresponde al campo `Date`.
  total: number;
}
