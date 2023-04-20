import React from 'react'
import { Button } from 'react-bootstrap'

import { Link } from 'react-router-dom'

export default function HomeScreen () {
  return (
    <div>
      <Button>
        <Link to="pbl/login" className="nav-link  ms-3 me-2">
            Iniciar sesión
        </Link>
      </Button>
      <Button>
        <Link to="pbl/register" className="nav-link  ms-3 me-2">
        Registrarse
        </Link>
      </Button>
    </div>
  )
}
