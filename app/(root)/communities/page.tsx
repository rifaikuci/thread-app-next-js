import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import Searchbar from "@/components/shared/Searchbar";
import Pagination from "@/components/shared/Pagination";
import CommunityCard from "@/components/cards/CommunityCard";

import { fetchUser } from "@/lib/actions/user.actions";
import { fetchCommunities } from "@/lib/actions/community.actions";

async function Page({
                        searchParams,
                    }: {
    searchParams: { [key: string]: string | undefined };
}) {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");

    let result = await fetchCommunities({
        searchString: searchParams.q,
        pageNumber: searchParams?.page ? +searchParams.page : 1,
        pageSize: 25,
    });


    result.communities = [
        {
            "key": "1",
            "id": "community1",
            "name": "Geliştirici Topluluğu",
            "username": "devcommunity",
            "imgUrl": "https://rifaikuci.com/management/assets/images/info/631310d1372b9.png",
            "bio": "Kodlamaya tutkulu bir topluluk",
            "members": 5000
        },
        {
            "key": "2",
            "id": "community2",
            "name": "Müzik Severler",
            "username": "musiclovers",
            "imgUrl": "https://example.com/musiclovers.jpg",
            "bio": "Her türden müziği sevenler burada buluşuyor",
            "members": 3500
        },
        {
            "key": "3",
            "id": "community3",
            "name": "Yoga ve Meditasyon",
            "username": "yogamasters",
            "imgUrl": "https://example.com/yogamasters.jpg",
            "bio": "Stresten uzaklaşmak için yoga ve meditasyon",
            "members": 2000
        },
        {
            "key": "4",
            "id": "community4",
            "name": "Seyahat Keşifleri",
            "username": "travelers",
            "imgUrl": "https://example.com/travelers.jpg",
            "bio": "Dünyayı gezmek isteyenler için rehber",
            "members": 7500
        },
        {
            "key": "5",
            "id": "community5",
            "name": "Resim Sanatı",
            "username": "artlovers",
            "imgUrl": "https://example.com/artlovers.jpg",
            "bio": "Sanat eserleri ve sanatçılar hakkında paylaşımlar",
            "members": 4200
        },
        {
            "key": "6",
            "id": "community6",
            "name": "Yemek Tarifleri",
            "username": "foodies",
            "imgUrl": "https://example.com/foodies.jpg",
            "bio": "Lezzetli yemek tarifleri ve mutfak hileleri",
            "members": 6000
        },
        {
            "key": "7",
            "id": "community7",
            "name": "Doğa Tutkunları",
            "username": "naturelovers",
            "imgUrl": "https://example.com/naturelovers.jpg",
            "bio": "Doğayı keşfetmek ve doğal güzellikleri paylaşmak",
            "members": 3000
        },
        {
            "key": "8",
            "id": "community8",
            "name": "Bilim ve Teknoloji",
            "username": "scienceandtech",
            "imgUrl": "https://example.com/scienceandtech.jpg",
            "bio": "Bilimsel gelişmeler ve teknoloji haberleri",
            "members": 8800
        },
        {
            "key": "9",
            "id": "community9",
            "name": "Kitap Okurları",
            "username": "bookworms",
            "imgUrl": "https://example.com/bookworms.jpg",
            "bio": "Kitap önerileri ve edebiyat tartışmaları",
            "members": 4200
        },
        {
            "key": "10",
            "id": "community10",
            "name": "Spor Tutkunları",
            "username": "sportsfans",
            "imgUrl": "https://example.com/sportsfans.jpg",
            "bio": "Spor haberleri ve maç analizleri",
            "members": 7500
        },
        {
            "key": "11",
            "id": "community11",
            "name": "Film ve Sinema",
            "username": "moviebuffs",
            "imgUrl": "https://example.com/moviebuffs.jpg",
            "bio": "En son film haberleri ve eleştirileri",
            "members": 5600
        },
        {
            "key": "12",
            "id": "community12",
            "name": "Eğitimci Topluluğu",
            "username": "educators",
            "imgUrl": "https://example.com/educators.jpg",
            "bio": "Öğretmenler ve eğitimciler için kaynaklar",
            "members": 2800
        },
        {
            "key": "13",
            "id": "community13",
            "name": "Sağlıklı Yaşam",
            "username": "healthyliving",
            "imgUrl": "https://example.com/healthyliving.jpg",
            "bio": "Sağlık ve wellness tavsiyeleri",
            "members": 4100
        },
        {
            "key": "14",
            "id": "community14",
            "name": "Girişimciler",
            "username": "entrepreneurs",
            "imgUrl": "https://example.com/entrepreneurs.jpg",
            "bio": "Başarılı girişimcilik hikayeleri ve stratejiler",
            "members": 5200
        },
        {
            "key": "15",
            "id": "community15",
            "name": "Ev Dekorasyonu",
            "username": "homedecor",
            "imgUrl": "https://example.com/homedecor.jpg",
            "bio": "Ev tasarımı ve dekorasyon fikirleri",
            "members": 3400
        },
        {
            "key": "16",
            "id": "community16",
            "name": "Hayvan Severler",
            "username": "animallovers",
            "imgUrl": "https://example.com/animallovers.jpg",
            "bio": "Evcil hayvanlar ve doğal yaşam hakkında paylaşımlar",
            "members": 4700
        },
        {
            "key": "17",
            "id": "community17",
            "name": "Moda Tutkunları",
            "username": "fashionistas",
            "imgUrl": "https://example.com/fashionistas.jpg",
            "bio": "Moda trendleri ve stil önerileri",
            "members": 6200
        }];


            return (
        <>
            <h1 className='head-text'>Communities</h1>

            <div className='mt-5'>
                <Searchbar routeType='communities' />
            </div>

            <section className='mt-9 flex flex-wrap gap-4'>
                {result.communities.length === 0 ? (
                    <p className='no-result'>No Result</p>
                ) : (
                    <>
                        {result.communities.map((community) => (
                            <CommunityCard
                                key={community.id}
                                id={community.id}
                                name={community.name}
                                username={community.username}
                                imgUrl={community.image}
                                bio={community.bio}
                                members={community.members}
                            />
                        ))}
                    </>
                )}
            </section>

            <Pagination
                path='communities'
                pageNumber={searchParams?.page ? +searchParams.page : 1}
                isNext={result.isNext}
            />
        </>
    );
}

export default Page;