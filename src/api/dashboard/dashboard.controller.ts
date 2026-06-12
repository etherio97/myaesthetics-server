import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @UseGuards(AuthGuard)
  @Get('batch-admin')
  getBatchAdmin(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return Promise.all([
      this.dashboardService.getTotalRevenue(startDate, endDate),
      this.dashboardService.getTotalDiscount(startDate, endDate),
      this.dashboardService.getTotalSaloonRevenue(startDate, endDate),
      this.dashboardService.getTotalFacialRevenue(startDate, endDate),
      this.dashboardService.getTotalRevenueCash(startDate, endDate),
      this.dashboardService.getTotalRevenueOther(startDate, endDate),
      this.dashboardService.getTotalExpenses(startDate, endDate),
    ])
      .then(([a, b, c, d, e, f, g]) => ({
        ...a,
        ...b,
        ...c,
        ...d,
        ...e,
        ...f,
        ...g,
      }))
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager')
  @Get('monthly-statistics')
  getMonthlyStatistics(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return Promise.all([
      this.dashboardService.getCustomerCountByDate(startDate, endDate),
      this.dashboardService.getTotalRevenueByDate(startDate, endDate),
    ])
      .then(([customerCount, revenueTrend]) => ({
        customerCount,
        revenueTrend,
      }))
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard)
  @Get('daily-statistics')
  getDailyStatistics(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return Promise.all([
      this.dashboardService.getCustomerCountByHour(startDate, endDate),
      this.dashboardService.getTotalRevenueByHour(startDate, endDate),
    ])
      .then(([customerCount, revenueTrend]) => ({
        customerCount,
        revenueTrend,
      }))
      .catch((e) => ({ error: 'Unexpected Error' }));
  }
}
