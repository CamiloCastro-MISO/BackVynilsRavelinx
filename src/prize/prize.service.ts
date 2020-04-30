import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Prize } from './prize.entity';
import { PrizeDTO } from './prize.dto';

import { BusinnesLogicException, BusinessError } from "../shared/errors/business-errors";

@Injectable()
export class PrizeService {
    constructor(
        @InjectRepository(Prize)
        private readonly prizeRepository: Repository<Prize>) { }

    async findAll(): Promise<PrizeDTO[]> {
        return await this.prizeRepository.find();
    }

    async findOne(id: number): Promise<PrizeDTO> {
        const prize = await this.prizeRepository.findOne(id);
        if (!prize)
            throw new BusinnesLogicException("The prize with the given id was not found", BusinessError.NOT_FOUND)

        return prize;
    }

    async create(prizeDTO: PrizeDTO): Promise<PrizeDTO> {

        let newPrize = new Prize();
        newPrize.name = prizeDTO.name;
        newPrize.description = prizeDTO.description
        newPrize.organization = prizeDTO.organization;

        return await this.prizeRepository.save(newPrize)
    }

    async update(id: number, prizeDTO: PrizeDTO): Promise<PrizeDTO> {
        const prize = await this.prizeRepository.findOne(id);
        if (!prize)
            throw new BusinnesLogicException("The prize with the given id was not found", BusinessError.NOT_FOUND)

        prize.name = prizeDTO.name;
        prize.description = prizeDTO.description;
        prize.organization = prizeDTO.organization;

        return await this.prizeRepository.save(prize);
    }

    async delete(id: number) {
        const prize = await this.prizeRepository.findOne(id);

        if (!prize)
            throw new BusinnesLogicException("The prize with the given id was not found", BusinessError.NOT_FOUND)

        return await this.prizeRepository.remove(prize);
    }

}
