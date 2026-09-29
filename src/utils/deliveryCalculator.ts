import { BarishalArea } from '../types';

interface DeliveryRate {
  area: BarishalArea;
  baseCharge: number;
  perKgCharge: number;
  freeDeliveryAbove: number;
}

const DELIVERY_RATES: DeliveryRate[] = [
  { area: 'সদর রোড', baseCharge: 60, perKgCharge: 5, freeDeliveryAbove: 5000 },
  { area: 'নথুল্লাবাদ', baseCharge: 70, perKgCharge: 6, freeDeliveryAbove: 5000 },
  { area: 'রূপাতলী', baseCharge: 80, perKgCharge: 7, freeDeliveryAbove: 6000 },
  { area: 'চৌমাথা', baseCharge: 90, perKgCharge: 8, freeDeliveryAbove: 6000 },
  { area: 'বগুড়া রোড', baseCharge: 75, perKgCharge: 6, freeDeliveryAbove: 5000 },
  { area: 'আমতলা মোড়', baseCharge: 85, perKgCharge: 7, freeDeliveryAbove: 5500 },
  { area: 'কা��ীপুর', baseCharge: 100, perKgCharge: 8, freeDeliveryAbove: 6500 },
  { area: 'বন্দর (লঞ্চঘাট)', baseCharge: 110, perKgCharge: 9, freeDeliveryAbove: 7000 },
  { area: 'বাকেরগঞ্জ', baseCharge: 120, perKgCharge: 10, freeDeliveryAbove: 7500 },
  { area: 'বাবুগঞ্জ', baseCharge: 125, perKgCharge: 10, freeDeliveryAbove: 7500 },
  { area: 'উজিরপুর', baseCharge: 130, perKgCharge: 11, freeDeliveryAbove: 8000 },
];

export const DeliveryCalculator = {
  // Calculate delivery fee based on area and order amount
  calculateFee: (area: BarishalArea, orderAmount: number, estimatedWeight: number = 1): number => {
    const rate = DELIVERY_RATES.find((r) => r.area === area);
    
    if (!rate) return 0;

    // Free delivery for orders above threshold
    if (orderAmount >= rate.freeDeliveryAbove) {
      return 0;
    }

    // Calculate fee: base charge + per kg charge
    const fee = rate.baseCharge + rate.perKgCharge * estimatedWeight;
    
    return Math.max(0, fee);
  },

  // Get delivery rate for specific area
  getRate: (area: BarishalArea): DeliveryRate | undefined => {
    return DELIVERY_RATES.find((r) => r.area === area);
  },

  // Get all delivery rates
  getAllRates: (): DeliveryRate[] => {
    return DELIVERY_RATES;
  },

  // Estimate delivery days based on area
  estimateDeliveryDays: (area: BarishalArea): { min: number; max: number } => {
    const areaIndex = DELIVERY_RATES.findIndex((r) => r.area === area);
    
    if (areaIndex <= 4) {
      // Central areas: 1-2 days
      return { min: 1, max: 2 };
    } else if (areaIndex <= 7) {
      // Outer areas: 2-3 days
      return { min: 2, max: 3 };
    } else {
      // Remote areas: 3-4 days
      return { min: 3, max: 4 };
    }
  },

  // Format delivery fee in Bengali
  formatDeliveryFee: (fee: number): string => {
    if (fee === 0) return 'বিনামূল্যে ডেলিভারি';
    return `৳${fee} ডেলিভারি চার্জ`;
  },
};
