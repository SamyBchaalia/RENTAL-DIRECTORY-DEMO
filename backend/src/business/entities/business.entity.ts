import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

export enum BusinessCategory {
  VEHICLES = 'vehicles',
  PROPERTIES = 'properties',
  EQUIPMENT = 'equipment',
  EVENTS = 'events',
  RECREATION = 'recreation',
  ELECTRONICS = 'electronics',
  FURNITURE = 'furniture',
  TOOLS = 'tools',
  OTHER = 'other',
}

@Entity('businesses')
@Index('idx_business_name', ['name'])
@Index('idx_business_category', ['category'])
@Index('idx_business_location', ['city', 'state', 'country'])
@Index('idx_business_status', ['isActive'])
export class Business {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'enum',
    enum: BusinessCategory,
    default: BusinessCategory.OTHER,
  })
  category: BusinessCategory;

  @Column({ type: 'varchar', length: 255, nullable: true })
  website: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  // Location fields
  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'varchar', length: 100 })
  city: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  state: string;

  @Column({ type: 'varchar', length: 100 })
  country: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  zipCode: string;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  longitude: number;

  // Business details
  @Column({ type: 'jsonb', nullable: true })
  rentalItems: string[]; // Array of items they rent out

  @Column({ type: 'jsonb', nullable: true })
  amenities: string[]; // Features/amenities

  @Column({ type: 'jsonb', nullable: true })
  images: string[]; // Image URLs

  @Column({ type: 'text', nullable: true })
  logo: string; // Logo URL

  @Column({ type: 'jsonb', nullable: true })
  operatingHours: {
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
  };

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0, nullable: true })
  rating: number;

  @Column({ type: 'int', default: 0 })
  reviewCount: number;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'boolean', default: false })
  isFeatured: boolean;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  // Full-text search column
  @Column({ type: 'tsvector', select: false, nullable: true })
  searchVector: any;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
