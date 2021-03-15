import IAdvertsDTO from '../dtos/IAdvertsDTO';
import Advert from '../infra/database/entities/Advert';

export default interface IAdvertsInterface {
  create(advertData: IAdvertsDTO): Promise<Advert>;
  findById(advert_id: string): Promise<Advert | undefined>;
  searchAdverts(search_keyword: string): Promise<(Advert | undefined)[]>;
  findAllAdvertsFromUser(user_id: string): Promise<(Advert | undefined)[]>;
  removeStockQuantity(advert_id: string, quantity: number): Promise<Advert>;
  increaseStockQuantitiy(advert_id: string, quantity: number): Promise<Advert>;
  delete(advert_id: string): Promise<void>;
  save(advert: Advert): Promise<Advert>;
}
