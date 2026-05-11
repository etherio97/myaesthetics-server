import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Receipt } from 'src/orm/receipt/receipt.entity';
import moment from 'moment';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Receipt)
    private repo: Repository<Receipt>,
  ) {}

  async getTotalRevenue(startDate: string, endDate: string) {
    startDate = moment(startDate).format('yyyy-MM-DDT00:00:00.000Z');
    endDate = moment(endDate).format('yyyy-MM-DDT23:59:59.999Z');

    return this.repo
      .query(
        `SELECT COALESCE(SUM(grand_total), 0) AS total_revenue 
        FROM receipts WHERE date BETWEEN $1 AND $2 
        AND status = 'Active'`,
        [startDate, endDate],
      )
      .then((res) => res[0]);
  }

  async getTotalDiscount(startDate: string, endDate: string) {
    startDate = moment(startDate).format('yyyy-MM-DDT00:00:00.000Z');
    endDate = moment(endDate).format('yyyy-MM-DDT23:59:59.999Z');

    return this.repo
      .query(
        `SELECT COALESCE(SUM(discount_amount), 0) AS total_discount 
        FROM receipts WHERE date BETWEEN $1 AND $2 
        AND status = 'Active'`,
        [startDate, endDate],
      )
      .then((res) => res[0]);
  }

  async getAverageRevenuePerPatient(startDate: string, endDate: string) {
    startDate = moment(startDate).format('yyyy-MM-DDT00:00:00.000Z');
    endDate = moment(endDate).format('yyyy-MM-DDT23:59:59.999Z');

    return this.repo
      .query(
        `SELECT COALESCE(AVG(grand_total), 0) AS avg_per_patient
        FROM receipts WHERE date BETWEEN $1 AND $2 
        AND status = 'Active'`,
        [startDate, endDate],
      )
      .then((res) => res[0]);
  }

  async getTotalSaloonRevenue(startDate: string, endDate: string) {
    startDate = moment(startDate).format('yyyy-MM-DDT00:00:00.000Z');
    endDate = moment(endDate).format('yyyy-MM-DDT23:59:59.999Z');

    return this.repo
      .query(
        `SELECT COALESCE(SUM(grand_total), 0) AS total_saloon_revenue
        FROM receipts WHERE date BETWEEN $1 AND $2 
        AND type = 'Saloon'
        AND status = 'Active'`,
        [startDate, endDate],
      )
      .then((res) => res[0]);
  }

  async getTotalFacialRevenue(startDate: string, endDate: string) {
    startDate = moment(startDate).format('yyyy-MM-DDT00:00:00.000Z');
    endDate = moment(endDate).format('yyyy-MM-DDT23:59:59.999Z');

    return this.repo
      .query(
        `SELECT COALESCE(SUM(grand_total), 0) AS total_facial_revenue
        FROM receipts WHERE date BETWEEN $1 AND $2 
        AND type = 'Facial'
        AND status = 'Active'`,
        [startDate, endDate],
      )
      .then((res) => res[0]);
  }
}
