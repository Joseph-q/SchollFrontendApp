import { RangeDate } from '@core/services/assitance/interfaces/req/AssitanceSumaryQuery';

export interface QueryParamsHistorialAssistance {
  courseId?: string;
  studentId?: string;
  date?: Date;
  range?: RangeDate;
}
