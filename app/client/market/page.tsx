import Link from 'next/link';

function fetchNFTList() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          previewImage: {
            asset: [
              {
                _ref: 'image-ee298e2fb78803f3226dcde22f1f2a8d69f56fad-600x600-png',
                _type: 'reference',
              },
            ],
          },
          _id: 'fbe3cc63-b47b-4a0c-8622-06f3c2d668fb',
          title: 'The Ape | NFT Drop',
          nftCollectionName: 'Apes',
          slug: { current: 'ape' },
          creator: {
            _id: '366eb843-855f-419d-9b62-5ad8b9265567',
            name: 'Cris',
            address: '0x37A2E873Ff37BAec54D75D68446FF5EB195D6859',
            slug: [{ current: 'cris' }],
          },
          ContractAddress: '0xdf2f3aD8d81915192E3646CC3F28F6347aCCEbF0',
          description: 'description',
          mainImage: {
            asset: [
              {
                _ref: 'image-a8b470ce656d91c45b9cd8a86e0b39ccb7dcee61-2951x2430-webp',
                _type: 'reference',
              },
            ],
          },
        },
      ]);
    }, 1000);
  });
}

export default async function Home() {
  const collections = await fetchNFTList();
  console.log('collections', collections);
  return (
    <div className="mx-auto max-w-7xl min-h-screen flex flex-col py-20 px-10 2xl:px-0">
      <h1 className="mb-10 text-4xl font-extralight">
        The{' '}
        <span className="font-extrabold underline decoration-pink-600/50">
          ChainDraw
        </span>{' '}
        NFT Market Place
      </h1>
      <main className="bg-slate-100 p-10 shadow-xl shadow-rose-400/20 ">
        <div className="grid space-x-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {collections.map((collection, index) => (
            <Link
              key={index}
              href={`/client/market/${collection.slug.current}`}
            >
              <div className="flex cursor-pointer flex-col items-center transition-all duration-200 hover:scale-105">
                <img
                  className="h-96 w-60 rounded-2xl object-cover"
                  src="/images/ape.jpg"
                  alt=""
                />
                <div className="w-60">
                  <h2 className="text-3xl">{collection.title}</h2>
                  <p className="mt-2 text-sm text-gray-400">
                    {collection.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
