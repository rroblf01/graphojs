import type { Set as GoSet } from '../collections/Set.ts';
import type { Diagram } from '../diagram/Diagram.ts';
import type { Group } from '../parts/Group.ts';
import type { Link } from '../parts/Link.ts';
import { Router } from './Router.ts';

/**
 * GoJS-compatible: a {@link Router} that routes links around node
 * obstacles. Real implementation: sets `Link.avoidObstacles = true` on
 * every routed link, which graphojs's renderer already respects via
 * `routeOrthogonalAvoidingObstacles` (`render/LinkRouter.ts`) — this class
 * doesn't duplicate that pathfinding, it just flips the same flag real
 * GoJS's `Routing.AvoidsNodes` would.
 */
export class AvoidsNodesRouter extends Router {
  constructor(init?: Partial<AvoidsNodesRouter>) {
    super();
    if (init) Object.assign(this, init);
  }

  override canRoute(_container: Diagram | Group): boolean {
    return this.isEnabled;
  }

  override isRoutable(_link: Link, _container: Diagram | Group): boolean {
    return true;
  }

  override routeLinks(links: GoSet<Link>, _container: Diagram | Group): void {
    if (!this.isEnabled) return;
    for (const link of links) {
      link.avoidObstacles = true;
    }
    this.invalidateRouter();
  }
}
