import Address from '../infra/database/entities/Address';
import IAddressDTO from '../dtos/IAddressDTO';

export default interface IAddressInterface {
  create(addressData: IAddressDTO): Promise<Address>;
  findAddressById(address_id: string): Promise<Address | undefined>;
  save(address: Address): Promise<Address>;
}
