import React from 'react';
import { putPlace, getUser, getOnePlace, getAddress } from '../../../api';
import { getToken, redirect } from '../../../functions';
import AddPlace from '../Add';


export default class EditPlace extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data: {
                title: "",
                slug: "",
                short_description: "",
                category_id: "",
                address: "",
                country: "",
                lat: "",
                lon: "",
                address: '',
                country: '',
                images: {}
            },
            placeId: null,
            loaded: false,
            user: null,
            token: ""
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    async componentDidMount(){
        const token = getToken();
        const user = await getUser(token)
        const { slug } = this.props.match.params; 
        await getOnePlace(slug)
        .then(async(res) => {
            if(!res || user.id === res.author_id){
                redirect('/');
            }

            const address = await getAddress(res.location.lat, res.location.lon);

            this.setState({
                data: {
                    title: res.title,
                    slug: res.slug,
                    short_description: res.short_description,
                    category_id: res.category ? parseInt(res.category.id) : "",
                    lat: parseFloat(res.location.lat),
                    lon: parseFloat(res.location.lon),
                    images: {},
                    address: address.house_number + ' ' + address.road,
                    country: address.country
                },
                loaded: true,
                user,
                token,
                placeId: res.id
            })
        })
    }

    onSubmit(data){
        putPlace(data, this.state.token, this.state.placeId);
    }

    render(){
        if(!this.state.loaded){
            return <div>Loading...</div>
        }
        else{
            return(
                <AddPlace
                    type="EDIT"
                    data={this.state.data}
                    onSubmit={this.onSubmit}
                />
            )
        }
    }
}