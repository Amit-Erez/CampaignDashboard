import { faker } from '@faker-js/faker'

const generateCampaign = () => {
  const impressions = faker.number.int({ min: 5000, max: 500000 })
  const clicks = faker.number.int({ min: 100, max: impressions })

  return {
    id: faker.string.uuid(),
    name: faker.company.catchPhrase(),
    brand: faker.company.name(),
    image: `https://picsum.photos/seed/${faker.string.uuid()}/300/200`,
    status: faker.helpers.arrayElement(['active', 'paused', 'completed']),
    impressions,
    clicks,
    ctr: clicks / impressions,
    spend: faker.number.int({ min: 200, max: 20000 }),
    startDate: faker.date.past().toISOString(),
  }
}

export const campaigns = Array.from({ length: 25 }, generateCampaign)