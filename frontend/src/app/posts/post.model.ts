//Schema used to fetch data from mongoDb database
export interface IPost {
  id: string,
  title: string,
  company: string,
  location: string,
  content: string,
}
