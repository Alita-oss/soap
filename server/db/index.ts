import mongoose from 'mongoose';

const main = async () => {
    const runtimeConfig = useRuntimeConfig();
    const url = runtimeConfig.MONGODB_CONNECTION;
    await mongoose.connect(url);
}

main().catch(err => console.log(err));

export default mongoose;
