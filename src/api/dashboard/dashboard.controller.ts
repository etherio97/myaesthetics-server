import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { AuthGuard } from 'src/guards/auth.guard';

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
    ])
      .then(([a, b, c, d]) => ({ ...a, ...b, ...c, ...d }))
      .catch((e) => ({ error: 'Unexpected Error' }));
  }
}
