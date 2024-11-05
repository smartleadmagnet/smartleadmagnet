export const affiliateProgramLink = "https://smartleadmagnet.promotekit.com/";
export const pricingPlans = {
  // Changed jobs to leadMagnets
  leadMagnets: { fixedPrice: 119, discountPercentage: 0.5, affiliateCommission: 0.15 },
};

export const getCurrentPrice = () => {
  return pricingPlans.leadMagnets.fixedPrice * pricingPlans.leadMagnets.discountPercentage;
};
