import slugify from 'slugify';
// import env
import { config } from 'dotenv';
config();
async function uniqueSlug(Model, name) {
  const slug = slugify(name, { lower: true });
  const slugExists = await Model.findOne({
    where: {
      slug,
    },
  });
  if (slugExists) {
    // console.log(slugExists.slug.split('-'));
    // if (Number(slugExists.slug.split('-').slice(-1))) {
    //   process.env.SLUG_COUNT = Number(slugExists.slug.split('-').slice(-1));
    // }
    const newSlug = `${slug}-${process.env.SLUG_COUNT}`;
    process.env.SLUG_COUNT = Number(process.env.SLUG_COUNT) + 1;
    return newSlug;
  }
  return slug;
}

export default uniqueSlug;
