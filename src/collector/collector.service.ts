import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinnesLogicException, BusinessError } from '../shared/errors/business-errors';
import { Collector } from './collector.entity';
import { CollectorDTO } from './collector.dto';

@Injectable()
export class CollectorService {
    constructor(
        @InjectRepository(Collector)
        private readonly collectorRepository: Repository<Collector>,
    ) { }

    async findAll(): Promise<CollectorDTO[]> {
        return await this.collectorRepository.find();
    }

    async findOne(id: number): Promise<CollectorDTO> {
        const collector = await this.collectorRepository.findOne(id);
        if (!collector)
            throw new BusinnesLogicException("The collector with the given id was not found", BusinessError.NOT_FOUND)
        return collector;
    }

    async create(collectorDTO: CollectorDTO): Promise<CollectorDTO> {
        const collector = new Collector();
        collector.name = collectorDTO.name;
        collector.telephone = collectorDTO.telephone;
        collector.email = collectorDTO.email;
        return await this.collectorRepository.save(collector);
    }

    async update(id: number, collectorDTO: CollectorDTO) {

        const collector = await this.collectorRepository.findOne(id);
        if (!collector)
            throw new BusinnesLogicException("The collector with the given id was not found", BusinessError.NOT_FOUND)
        else {
            collector.name = collectorDTO.name;
            collector.telephone = collectorDTO.telephone;
            collector.email = collectorDTO.email;
            await this.collectorRepository.save(collector);
        }
        return collector;
    }

    async delete(id: number) {
        const collector = await this.collectorRepository.findOne(id);
        if (!collector)
            throw new BusinnesLogicException("The collector with the given id was not found", BusinessError.NOT_FOUND)
        return await this.collectorRepository.remove(collector);
    }

}
