import Address from '../infra/database/entities/Address';
import IAddressDTO from '../dtos/IAddressDTO';

export default interface IAddressInterface {
  create(addressData: IAddressDTO): Promise<Address>;
  save(address: Address): Promise<Address>;
}
