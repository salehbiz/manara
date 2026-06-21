import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ALL_PROJECTS = [
  {
    id: 1,
    name: "Studio Apartment",
    location: "Karpaz Anayolu, Dikarpaz, North Cyprus",
    city: "Dikarpaz",
    beds: "1 Bed",
    baths: "1 Bath",
    size: 45,
    type: "Apartment",
    priceRange: "Under $250,000",
    price: 110000,
    image: "/assets/explore_apartment_2_left.png"
  },
  {
    id: 2,
    name: "1+1 Apartment",
    location: "Karpaz Anayolu, Dikarpaz, North Cyprus",
    city: "Dikarpaz",
    beds: "1 Bed",
    baths: "1 Bath",
    size: 70,
    type: "Apartment",
    priceRange: "$250,000 – $500,000",
    price: 165000,
    image: "/assets/layout_1plus1.png"
  },
  {
    id: 3,
    name: "2+1 Apartment",
    location: "Karpaz Anayolu, Dikarpaz, North Cyprus",
    city: "Dikarpaz",
    beds: "2 Beds",
    baths: "2 Baths",
    size: 110,
    type: "Apartment",
    priceRange: "$250,000 – $500,000",
    price: 245000,
    image: "/assets/explore_apartment_right.png"
  },
  {
    id: 4,
    name: "Luxury Penthouse Suite",
    location: "Karpaz Anayolu, Dikarpaz, North Cyprus",
    city: "Dikarpaz",
    beds: "3 Beds",
    baths: "3 Baths",
    size: 180,
    type: "Villa",
    priceRange: "$500,000 – $1,000,000",
    price: 520000,
    image: "/assets/explore_apartment_2_right.png"
  }
];

export default function Projects() {
  const routerLocation = useLocation();
  
  const [filterType, setFilterType] = useState('Property type');
  const [filterPrice, setFilterPrice] = useState('Price');
  const [filterCity, setFilterCity] = useState('All cities');

  // Load search filters from Home page redirect state
  useEffect(() => {
    if (routerLocation.state) {
      if (routerLocation.state.propertyType) setFilterType(routerLocation.state.propertyType);
      if (routerLocation.state.priceRange) setFilterPrice(routerLocation.state.priceRange);
      if (routerLocation.state.location) setFilterCity(routerLocation.state.location);
    }
  }, [routerLocation.state]);

  const filteredProjects = ALL_PROJECTS.filter(project => {
    const typeMatch = filterType === 'Property type' || project.type === filterType;
    const cityMatch = filterCity === 'All cities' || project.city === filterCity;
    
    let priceMatch = true;
    if (filterPrice !== 'Price') {
      if (filterPrice === 'Under $250,000') {
        priceMatch = project.price < 250000;
      } else if (filterPrice === '$250,000 – $500,000') {
        priceMatch = project.price >= 250000 && project.price <= 500000;
      } else if (filterPrice === '$500,000 – $1,000,000') {
        priceMatch = project.price >= 500000 && project.price <= 1000000;
      } else if (filterPrice === '$1,000,000+') {
        priceMatch = project.price >= 1000000;
      }
    }

    return typeMatch && cityMatch && priceMatch;
  });

  return (
    <div className="container" style={{ paddingBottom: '8rem' }}>
      <div className="projects-header">
        <h1 className="h1 text-color-black" style={{ marginBottom: '1rem' }}>Selected works</h1>
        <p className="body-text-24 mob-16 opacity60" style={{ maxWidth: '38rem' }}>
          Every residence by Caesar Palm Jumeirah is designed to merge Dubai's architecture with Mediterranean coastal serenity.
        </p>
      </div>

      {/* Filter Controls */}
      <div className="projects-filter-bar">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', minWidth: '150px' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', opacity: 0.6 }}>Type</label>
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="Property type">Property type</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Penthouse/Villa</option>
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', minWidth: '150px' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', opacity: 0.6 }}>Price Range</label>
          <select value={filterPrice} onChange={(e) => setFilterPrice(e.target.value)}>
            <option value="Price">Price</option>
            <option value="Under $250,000">Under $250,000</option>
            <option value="$250,000 – $500,000">$250,000 – $500,000</option>
            <option value="$500,000 – $1,000,000">$500,000 – $1,000,000</option>
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', minWidth: '150px' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', opacity: 0.6 }}>City/Region</label>
          <select value={filterCity} onChange={(e) => setFilterCity(e.target.value)}>
            <option value="All cities">All regions</option>
            <option value="Dikarpaz">Dikarpaz</option>
          </select>
        </div>

        {(filterType !== 'Property type' || filterPrice !== 'Price' || filterCity !== 'All cities') && (
          <button 
            className="button is--text" 
            style={{ alignSelf: 'flex-end', height: '2.5rem', padding: '0 1.5rem' }}
            onClick={() => {
              setFilterType('Property type');
              setFilterPrice('Price');
              setFilterCity('All cities');
            }}
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Grid */}
      {filteredProjects.length > 0 ? (
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="img-wrap">
                <img src={project.image} alt={project.name} />
              </div>
              <div className="project-card-details">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <h3 className="h3" style={{ fontSize: '1.5rem', textTransform: 'none', marginBottom: '0.25rem' }}>{project.name}</h3>
                    <p style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', opacity: 0.6, fontSize: '0.9rem' }}>
                      <img src="https://cdn.prod.website-files.com/6912666ed2f85503a5c73fb4/69624a9a9b23adbc1e9499d6_icon-location.svg" alt="" style={{ width: '1rem', height: '1rem' }} />
                      {project.location}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: 600, fontFamily: 'var(--font-garet)' }}>
                      ${project.price.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', borderTop: '1px solid var(--color-border)', paddingTop: '1rem', marginTop: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', opacity: 0.8 }}>
                    <img src="https://cdn.prod.website-files.com/6912666ed2f85503a5c73fb4/69624a9aebf6e7b4b59381e7_icon-bed.svg" alt="" style={{ width: '1.1rem', height: '1.1rem' }} />
                    {project.beds}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', opacity: 0.8 }}>
                    <img src="https://cdn.prod.website-files.com/6912666ed2f85503a5c73fb4/69624a9a1117a5a3415503e5_icon-bath.svg" alt="" style={{ width: '1.1rem', height: '1.1rem' }} />
                    {project.baths}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', opacity: 0.8 }}>
                    <img src="https://cdn.prod.website-files.com/6912666ed2f85503a5c73fb4/69624a9a681441448e4dccbd_icon-home.svg" alt="" style={{ width: '1.1rem', height: '1.1rem' }} />
                    {project.size} m²
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '6rem 0', background: '#fff', borderRadius: '1.5rem' }}>
          <h2 className="text-weight-medium" style={{ marginBottom: '1rem' }}>Nothing found</h2>
          <p className="body-text-16" style={{ opacity: 0.6 }}>Nothing found for this search, try changing your filters!</p>
        </div>
      )}
    </div>
  );
}
