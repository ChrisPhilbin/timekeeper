import React from 'react'

const Projects = (props) => {
    return(
        <>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Status</th>
                            <th scope="col">Details</th>
                            <th scope="col">Project</th>
                            <th scope="col" className="text-right">
                            Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>{props.children}</tbody>
                </table>
            </div>
        </>
    )
}

export default Projects