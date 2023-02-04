export default {
  virtuals: true,
  versionKey: false,
  transform(doc: any, ret: any, options: any) {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
};
