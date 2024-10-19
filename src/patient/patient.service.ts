import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './patient.entity';
import { CreatePatientDto } from './dtos/create-patient.dto';
import { UpdatePatientDto } from './dtos/update-patient.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) {}

  // Criar um novo paciente
  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    // Processa o documento de identificação se estiver presente
 

    // Cria a instância do paciente
    const patient = this.patientRepository.create(createPatientDto);
    return await this.patientRepository.save(patient);
  }

  // Recuperar todos os pacientes
  async findAll(): Promise<Patient[]> {
    return await this.patientRepository.find();
  }

  // Recuperar um paciente por ID
  async findOne(id: string): Promise<Patient> {
    const patient = await this.patientRepository.findOne({where: {id}});
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
    return patient;
  }

  // Atualizar um paciente
  async update(id: string, updatePatientDto: UpdatePatientDto): Promise<Patient> {
    const patient = await this.findOne(id);

    // Processa o documento de identificação se estiver presente
    // if (updatePatientDto.identificationDocument) {
    //   updatePatientDto.identificationDocument = await this.processFormData(updatePatientDto.identificationDocument);
    // }

    // Atualiza os dados do paciente
    Object.assign(patient, updatePatientDto);
    return await this.patientRepository.save(patient);
  }

  // Excluir um paciente
  async remove(id: string): Promise<void> {
    const patient = await this.findOne(id);
    await this.patientRepository.remove(patient);
  }

  // Função para processar FormData e converter em Buffer
  private async processFormData(formData: FormData): Promise<Buffer> {
    const fileBuffer = await new Promise<Buffer>((resolve, reject) => {
      // Converte o FormData em um Buffer
      const reader = new FileReader();
      reader.onload = () => {
        resolve(Buffer.from(reader.result as ArrayBuffer));
      };
      reader.onerror = (error) => {
        reject(new BadRequestException('Error processing file'));
      };

      // Lê o arquivo do FormData (supondo que o campo seja chamado 'file')
      const file = formData.get('file');
      if (file instanceof Blob) {
        reader.readAsArrayBuffer(file);
      } else {
        reject(new BadRequestException('No valid file found in FormData'));
      }
    });

    return fileBuffer;
  }
}
