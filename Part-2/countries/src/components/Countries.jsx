const Countries = ({ countries, onclick }) => {
    
    return (
        <table>
            <tbody>
            {countries.map(country => (
                <tr key={country.name.common}>
                <td >
                    {country.name.common}{" "}
                    <button onClick={() => onclick(country.name.common)}>show</button>
                </td>
                
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export default Countries