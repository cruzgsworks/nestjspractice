import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDTO } from './dtos/create-report.dto';
import { Report } from './report.entity';
import { GetEstimateDTO } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(reportDTO: CreateReportDTO, user: User) {
    const report = this.repo.create(reportDTO);
    report.user = user;

    return this.repo.save(report);
  }

  async changeApproval(id: string, approved: boolean) {
    const report = await this.repo.findOne({ where: { id: parseInt(id) } });

    if (!report) {
      throw new NotFoundException('report not found');
    }

    report.approved = approved;
    return this.repo.save(report);
  }

  async createEstimate({
    make,
    model,
    lng,
    lat,
    year,
    mileage,
  }: GetEstimateDTO) {
    return this.repo
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make = :make', { make })
      .andWhere('model = :model', { model })
      .andWhere('lng - :lng BETWEEN -5 and 5', { lng })
      .andWhere('lat - :lat BETWEEN -5 and 5', { lat })
      .andWhere('year - :year BETWEEN -3 and 3', { year })
      .andWhere('approved IS TRUE')
      .orderBy('ABS(mileage - :mileage)', 'DESC').setParameters({mileage})
      .limit(3)
      .getRawOne();
  }
}
