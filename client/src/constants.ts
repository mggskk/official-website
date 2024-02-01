export const userRoles = {
  ADMIN: "ADMIN",
  USER: "USER",
  STAFF: "STAFF",
}

export const availableUserRoles = Object.values(userRoles)

export const genders = {
  MALE: "MALE",
  FEMALE: "FEMALE",
}

export const availableGenders = Object.values(genders)

export const carouselImgArray = [
  import.meta.env.VITE_CAROUSEL_IMG_1,
  import.meta.env.VITE_CAROUSEL_IMG_2,
  import.meta.env.VITE_CAROUSEL_IMG_3,
  import.meta.env.VITE_CAROUSEL_IMG_4,
]
