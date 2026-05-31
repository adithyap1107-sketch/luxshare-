import { fleetConfig, type CarItem } from '../config'

export type Exhibition = CarItem

export const exhibitions = fleetConfig.items

export function getExhibitionBySlug(slug: string) {
  return exhibitions.find((exhibition) => exhibition.slug === slug) ?? null
}

export function formatINR(amount: number): string {
  return "\u20B9" + amount.toLocaleString('en-IN')
}

export function formatLakhs(amount: number): string {
  return "\u20B9" + (amount / 100000).toFixed(2) + " Lakhs"
}
